"use server";
import { signIn as naSignIn, signOut as naSignOut } from ".";

// export async function signIn(...props:any) {
//   await naSignIn(...props)
//   .then((res) =>{
//     console.log('sign in   ',res)
//     return res
//   }).catch((err) =>{
//     console.log('sign in error 11 22 33   ',err)
//     return err
//   })
// }
export async function signIn(...props: any) {
  try {
    const res:any = await naSignIn(...props);
    if (res.error) {
      throw new Error(res.error);
    }
    console.log('sign in', res);
    return res;
  } catch (err: any) {
    // Extract the specific error message
    if (err.cause?.err) {
      throw new Error(err.cause.err.message);
    }
    throw err;
  }
}


export async function signOut() {
  await naSignOut();
}
