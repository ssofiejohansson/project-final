
export const Userlogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
  };

  return (
    <>
      <div className='p-6 text-center'>
        <h1 className='text-3xl font-bold'>User Login</h1>
        <p>This is a test to see if the page loads</p>

        <form
          onSubmit={handleSubmit}
          className='mt-6 max-w-sm mx-auto space-y-4'
        >
          <div>
            <input
              type='email'
              placeholder='Email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
