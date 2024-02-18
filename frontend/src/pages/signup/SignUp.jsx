import { useState } from 'react'
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName : '',
        username : '',
        password : '',
        confirmPassword : '',
        gender : ''
    })

    const {loading, signup} = useSignUp();

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs, gender});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 
                bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                  <h1 className="text-3x1 font-semibold text-center text-gray-300">Sign Up
                    <span className="text-blue-500"> ChatApp</span></h1>

                <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-black">Full Name</span>
                            </label>
                            <input type="text" placeholder="John Doe" value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName : e.target.value})}
                            className="w-full input input-bordered h-10"/>
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-black">Username</span>
                            </label>
                            <input type="text" placeholder="johndoe" value={inputs.username} onChange={(e) => setInputs({...inputs, username : e.target.value})}
                            className="w-full input input-bordered h-10"/>
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-black">Password</span>
                            </label>
                            <input type="password" placeholder="Enter password"
                            value={inputs.password} onChange={(e) => setInputs({...inputs, password : e.target.value})} className="w-full input input-bordered h-10"/>
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text text-black">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Enter confirm password"
                            value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword : e.target.value})} className="w-full input input-bordered h-10"/>
                        </div>

                        <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender}/>

                        <Link to={'/login'} className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block">
                            Already have an account?
                        </Link>

                        <div>
                            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                                </button>
                        </div>
                    </form>
    </div>
    </div>
  )
}

export default SignUp;



// import GenderCheckbox from './GenderCheckbox';

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 
//                 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//                   <h1 className="text-3x1 font-semibold text-center text-gray-300">Sign Up
//                     <span className="text-blue-500"> ChatApp</span></h1>

//                 <form>
//                         <div>
//                             <label className="label p-2">
//                                 <span className="text-base label-text text-black">Full Name</span>
//                             </label>
//                             <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10"/>
//                         </div>

//                         <div>
//                             <label className="label p-2">
//                                 <span className="text-base label-text text-black">Username</span>
//                             </label>
//                             <input type="text" placeholder="johndoe" className="w-full input input-bordered h-10"/>
//                         </div>

//                         <div>
//                             <label className="label p-2">
//                                 <span className="text-base label-text text-black">Password</span>
//                             </label>
//                             <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"/>
//                         </div>

//                         <div>
//                             <label className="label p-2">
//                                 <span className="text-base label-text text-black">Confirm Password</span>
//                             </label>
//                             <input type="password" placeholder="Enter confirm password" className="w-full input input-bordered h-10"/>
//                         </div>

//                         <GenderCheckbox/>

//                         <a href="#" className="text-sm text-black hover:underline hover:text-blue-600 mt-2 inline-block">
//                             Already have an account?
//                         </a>

//                         <div>
//                             <button className="btn btn-block btn-sm mt-2">Sign Up</button>
//                         </div>
//                     </form>
//     </div>
//     </div>
//   )
// }

// export default SignUp;
