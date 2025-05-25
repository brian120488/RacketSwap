import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left Section: Login Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <form className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 flex justify-center items-center bg-[#f9f0e7]">
        <div className="relative w-1/2 h-1/2">
          <Image
            src="/login-image.png"
            fill={true}
            alt="Login Image"
          />
        </div>
      </div>
    </div>
  );
}
