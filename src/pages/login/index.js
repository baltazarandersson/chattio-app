import { AuthButtons } from "../../components/AuthButtons";

export function Login() {
  return (
    <div className="flex w-screen h-screen bg-zinc-800  justify-center items-center">
      <div className="w-full p-4 h-4/5 flex flex-col justify-around items-start bg-zinc-900 md:rounded-xl box-border border-2 border-zinc-700 md:p-16 md:w-2/3 md:h-2/3 ">
        <p className="text-gray-50 text-2xl text-center w-full sm:text-4xl font-bold">
          Get intro your account!
        </p>
        <AuthButtons />
      </div>
    </div>
  );
}
