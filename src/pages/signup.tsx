const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div className="mb-6">
          <input
            type="text"
            calssName="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Email address"
          />
        </div>

        <div calssName="mb-6">
          <input
            type="password"
            calssName="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Password"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
