import { logoutAction } from './logout';


export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        You have been logged out due to an invalid token
      </h1>
      <form action={logoutAction}>
        <button type="submit" className="cursor-pointer shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 px-6 py-3 rounded-md text-lg font-medium text-[#647FBC] hover:text-black hover:bg-[#647FBC] flex items-center">
          Clear Session & Go to Login
        </button>
      </form>
    </div>
  );
}
