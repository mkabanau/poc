/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

const path = require("path");
const crypto = require("crypto");

const { validate } = require("schema-utils");
const serialize = require("serialize-javascript");

const schema = require("./options.json");

const Nebulus = require("nebulus")

/** @typedef {import("schema-utils/declarations/validate").Schema} Schema */
/** @typedef {import("webpack").Compiler} Compiler */
/** @typedef {import("webpack").WebpackPluginInstance} WebpackPluginInstance */
/** @typedef {import("webpack").Compilation} Compilation */
/** @typedef {import("webpack").sources.Source} Source */
/** @typedef {import("webpack").Asset} Asset */
/** @typedef {import("webpack").WebpackError} WebpackError */

/**
 * @template T
 * @typedef {T | { valueOf(): T }} WithImplicitCoercion
 */

/** @typedef {RegExp | string} Rule */

/** @typedef {Rule[] | Rule} Rules */

/**
 * @typedef {{ [key: string]: any }} CustomOptions
 */

/**
 * @template T
 * @typedef {T extends infer U ? U : CustomOptions} InferDefaultType
 */

/**
 * @template T
 * @typedef {InferDefaultType<T>} CompressionOptions
 */

/**
 * @template T
 * @callback AlgorithmFunction
 * @param {Buffer} input
 * @param {CompressionOptions<T>} options
 * @param {(error: Error | null | undefined, result: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer> | Uint8Array | ReadonlyArray<number> | WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string> | WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }) => void} callback
 */

/**
 * @typedef {{[key: string]: any}} PathData
 */

/**
 * @typedef {string | ((fileData: PathData) => string)} Filename
 */

/**
 * @typedef {boolean | "keep-source-map"} DeleteOriginalAssets
 */

/**
 * @template T
 * @typedef {Object} BasePluginOptions
 * @property {Rules} [test]
 * @property {Rules} [include]
 * @property {Rules} [exclude]
 * @property {number} [threshold]
 * @property {number} [minRatio]
 * @property {DeleteOriginalAssets} [deleteOriginalAssets]
 * @property {Filename} [filename]
 */

/**
 * @typedef {import("zlib").ZlibOptions} ZlibOptions
 */

/**
 * @template T
 * @typedef {T extends ZlibOptions ? { algorithm?: string | AlgorithmFunction<T> | undefined, compressionOptions?: CompressionOptions<T> | undefined } : { algorithm: string | AlgorithmFunction<T>, compressionOptions?: CompressionOptions<T> | undefined }} DefinedDefaultAlgorithmAndOptions
 */

/**
 * @template T
 * @typedef {BasePluginOptions<T> & { algorithm: string | AlgorithmFunction<T>, compressionOptions: CompressionOptions<T>, threshold: number, minRatio: number, deleteOriginalAssets: DeleteOriginalAssets, filename: Filename }} InternalPluginOptions
 */

/**
 * @template [T=ZlibOptions]
 * @implements WebpackPluginInstance
 */
class CompressionPlugin {
  /**
   * @param {BasePluginOptions<T> & DefinedDefaultAlgorithmAndOptions<T>} [options]
   */
  constructor(options) {
    validate(/** @type {Schema} */ (schema), options || {}, {
      name: "Compression Plugin",
      baseDataPath: "options",
    });

    const {
      test,
      include,
      exclude,
      algorithm = "gzip",
      compressionOptions = /** @type {CompressionOptions<T>} */ ({}),
      filename = (options || {}).algorithm === "brotliCompress"
        ? "[path][base].br"
        : "[path][base].gz",
      threshold = 0,
      minRatio = 0.8,
      deleteOriginalAssets = false,
    } = options || {};

    /**
     * @private
     * @type {InternalPluginOptions<T>}
     */
    this.options = {
      test,
      include,
      exclude,
      algorithm,
      compressionOptions,
      filename,
      threshold,
      minRatio,
      deleteOriginalAssets,
    };

    /**
     * @private
     * @type {AlgorithmFunction<T>}
     */
    this.algorithm =
      /** @type {AlgorithmFunction<T>} */
      (this.options.algorithm);

    if (typeof this.algorithm === "string") {
      /**
       * @type {typeof import("zlib")}
       */
      // eslint-disable-next-line global-require
      const zlib = require("zlib");

      /**
       * @private
       * @type {AlgorithmFunction<T>}
       */
      this.algorithm = zlib[this.algorithm];

      if (!this.algorithm) {
        throw new Error(
          `Algorithm "${this.options.algorithm}" is not found in "zlib"`
        );
      }

      const defaultCompressionOptions =
        {
          gzip: {
            level: zlib.constants.Z_BEST_COMPRESSION,
          },
          deflate: {
            level: zlib.constants.Z_BEST_COMPRESSION,
          },
          deflateRaw: {
            level: zlib.constants.Z_BEST_COMPRESSION,
          },
          brotliCompress: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]:
                zlib.constants.BROTLI_MAX_QUALITY,
            },
          },
        }[/** @type {string} */ (algorithm)] || {};

      this.options.compressionOptions =
        /**
         * @type {CompressionOptions<T>}
         */
        ({
          .../** @type {object} */ (defaultCompressionOptions),
          .../** @type {object} */ (this.options.compressionOptions),
        });

      this.n = new Nebulus({path:"./build"})
    }
  }

  /**
   * @private
   * @param {Compiler} compiler
   * @param {Compilation} compilation
   * @param {Record<string, Source>} assets
   * @returns {Promise<void>}
   */
  async compress(compiler, compilation, assets) {
    console.log(Object.keys(assets))
    const assetsForMinify = (
      await Promise.all(
        Object.keys(assets).map(async (name) => { 
          const { info, source } = /** @type {Asset} */ (
            compilation.getAsset(name)
          );

          let buffer;

            if (typeof source.buffer === "function") {
              buffer = source.buffer();
            }
            // Compatibility with webpack plugins which don't use `webpack-sources`
            // See https://github.com/webpack-contrib/compression-webpack-plugin/issues/236
            else {
              buffer = source.source();

              if (!Buffer.isBuffer(buffer)) {
                // eslint-disable-next-line no-param-reassign
                buffer = Buffer.from(buffer);
              }
            }
          return { name, source, info, buffer};
        })
      )
    );

    const { RawSource } = compiler.webpack.sources;
    const scheduledTasks = [];
    // console.log(assetsForMinify)
    for (const asset of assetsForMinify) {
      scheduledTasks.push(
        (async () => {
          // @ts-ignore
          const { name, source, buffer, info } = asset;

      
          let isIndex = false 
          let isRuntime = false 
          let isMain = false
          let isChunk = false
          let newInfo = {...info, isIndex, isRuntime, isMain, isChunk}
          if (name.startsWith("index")){
            newInfo.isIndex = true
            return {name, cid:"", info:newInfo, source}
          }
          if (name.startsWith("runtime")){
            newInfo.isRuntime = true
            return {name, cid:"", info:newInfo, source}
          }
          if (name.startsWith("main")){
            newInfo.isMain = true
          }else{
            newInfo.isChunk = true
          }
          console.log(name)
          let cid = await this.n.add(buffer)
          console.log(`${name}->${cid}`)
          // console.log("CID", cid)
          //compilation.renameAsset(name, cid)
          return {name, cid, info:newInfo}
          // compilation.emitAsset(newFilename, output.source, newInfo);
        })()
      );
    }

    const finalAssets = await Promise.all(scheduledTasks);
    const chunks = finalAssets.filter(e => e.info.isChunk)
    let metainfo = {}
    chunks.forEach(e=> {
      if (e.name.endsWith(".js")){
        metainfo[e.name.slice(0,-3)]=e.cid
      } else if(e.name.endsWith(".png")) {
        metainfo[e.name.slice(0,-4)]=e.cid
      }else{
        metainfo[e.name]=e.cid
      }
    })
    const runtime = finalAssets.find(e=> e.info.isRuntime)
    if (!runtime){
      return
    }
    const { ReplaceSource } = compiler.webpack.sources;
    const newRuntimeSource = new ReplaceSource(runtime?.source, 'MyPlugin');
    // 
    const startPattern = "__webpack_require__.u ="
    // console.log(typeof runtime.source)
    const start = runtime.source.source().indexOf(startPattern) + startPattern.length;
    const first = runtime.source.source().slice(start).indexOf(";")
    const second = runtime.source.source().slice(start).indexOf(";", first+1)
    // console.log(start, first,second)
    // console.log(oldSource.source().slice(start, start+second))
    const end = start + second
    // const end = start + (options.codeToReplace.length - 1);
    // console.log(runtime.source.source().slice(start, end))
    // console.log(JSON.stringify(metainfo))
    const newCode = `(chunkId) => {console.log("chunk to query",chunkId);return "" + ${JSON.stringify(metainfo)}[chunkId] ; };`
    // console.log(newCode)

    newRuntimeSource.replace(start, end, newCode, 'MyPlugin');
    console.log(runtime.name)
    runtime.cid = await this.n.add(newRuntimeSource.buffer())
    console.log(`${runtime.name}->${runtime.cid}`)
    const index = finalAssets.find(e=> e.info.isIndex)
    if (!index){
      return
    }
    const main = finalAssets.find(e=> e.info.isMain)
    if (!main){
      return
    }
    console.log(index?.source)
    if (!index.source){
      return
    }
    const newIndex = new ReplaceSource(index.source, 'MyPlugin');
    const start1 = index.source.source().indexOf(main.name)
    console.log(`string to replace ${index.source.source().slice(start1, start1 + main.name.length -1)}`)
    newIndex.replace(start1, start1 + main.name.length - 1, main.cid)
    const start2 = index.source.source().indexOf(runtime.name)
    console.log(`string to replace ${index.source.source().slice(start2, start2 + runtime.name.length -1)}`)
    newIndex.replace(start2, start2 + runtime.name.length - 1, runtime.cid)
    console.log(newIndex.source())
    index.cid = await this.n.add(newIndex.buffer())
    console.log(`${index.name}->${index.cid}`)
    console.log("INDEX CID: ", index.cid)
  }

  /**
   * @param {Compiler} compiler
   * @returns {void}
   */
  apply(compiler) {
    const pluginName = this.constructor.name;

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: pluginName,
          stage:
            compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
          additionalAssets: true,
        },
        (assets) => this.compress(compiler, compilation, assets)
      );

    });
  }
}

module.exports = CompressionPlugin;
