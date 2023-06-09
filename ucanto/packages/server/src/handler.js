import * as API from './api.js'
import { access, Schema, Failure } from '@ucanto/validator'

/**
 * Function that can be used to define given capability provider. It decorates
 * passed handler and takes care of UCAN validation and only calls the handler
 * when validation succeeds.
 *
 *
 * @template {API.Ability} A
 * @template {API.URI} R
 * @template {API.Caveats} C
 * @template {{}} O
 * @template {{}} X
 * @param {API.CapabilityParser<API.Match<API.ParsedCapability<A, R, C>>>} capability
 * @param {(input:API.ProviderInput<API.ParsedCapability<A, R, C>>) => API.Await<API.Result<O, X>>} handler
 * @returns {API.ServiceMethod<API.Capability<A, R, C>, O, X>}
 */

export const provide = (capability, handler) =>
  provideAdvanced({ capability, handler })

/**
 * Function that can be used to define given capability provider. It decorates
 * passed handler and takes care of UCAN validation and only calls the handler
 * when validation succeeds. This is an advanced version of `provide` function
 * which allowing you to pass additional `input.audience` schema so that handler
 * could accept invocations for audiences other than the service itself. If
 * `input.audience` is not provided behavior is the same as `provide` function.
 *
 * @template {API.Ability} A
 * @template {API.URI} R
 * @template {API.Caveats} C
 * @template {{}} O
 * @template {{}} X
 * @param {object} input
 * @param {API.Reader<API.DID>} [input.audience]
 * @param {API.CapabilityParser<API.Match<API.ParsedCapability<A, R, C>>>} input.capability
 * @param {(input:API.ProviderInput<API.ParsedCapability<A, R, C>>) => API.Await<API.Result<O, X>>} input.handler
 * @returns {API.ServiceMethod<API.Capability<A, R, C>, O, X>}
 */

export const provideAdvanced =
  ({ capability, handler, audience }) =>
  /**
   * @param {API.Invocation<API.Capability<A, R, C>>} invocation
   * @param {API.InvocationContext} options
   */
  async (invocation, options) => {
    // If audience schema is not provided we expect the audience to match
    // the server id. Users could pass `schema.string()` if they want to accept
    // any audience.
    const audienceSchema = audience || Schema.literal(options.id.did())
    const result = audienceSchema.read(invocation.audience.did())
    if (result.error) {
      return { error: new InvalidAudience({ cause: result.error }) }
    }

    const authorization = await access(invocation, {
      ...options,
      authority: options.id,
      capability,
    })
    if (authorization.error) {
      return authorization
    } else {
      return handler({
        capability: authorization.ok.capability,
        invocation,
        context: options,
      })
    }
  }

/**
 * @implements {API.InvalidAudience}
 */
class InvalidAudience extends Failure {
  /**
   * @param {object} source
   * @param {API.Failure} source.cause
   */
  constructor({ cause }) {
    super()
    /** @type {'InvalidAudience'} */
    this.name = 'InvalidAudience'
    this.cause = cause
  }
  describe() {
    return this.cause.message
  }
}
