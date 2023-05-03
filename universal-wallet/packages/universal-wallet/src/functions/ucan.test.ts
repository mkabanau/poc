import { Capability } from "./ucan";

it("test capability", async ()=>{
    const token = await Capability()
    console.log(token)
})