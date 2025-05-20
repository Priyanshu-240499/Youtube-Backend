import React, {  useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const [preview, setPreview] = useState({
    avatar: null,
    coverImage: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const fileSizeMB = file.size / (1024 * 1024);

      if (
        (name === 'avatar' && fileSizeMB > 2) ||
        (name === 'coverImage' && fileSizeMB > 6)
      ) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${name === 'avatar' ? 'Avatar' : 'Cover image'} is too large.`,
        }));
        return;
      }

      setFormData({ ...formData, [name]: file });
      setPreview({ ...preview, [name]: URL.createObjectURL(file) });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
     
      
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Registration failed');
      const result = await response.json();
      setSuccess('Registration successful!');
      console.log(result);
    } catch (error) {
      setSuccess('');
      console.error(error);
      alert('Something went wrong! Please try again.');
    }
  };

  // check if frontend is receiving data from backend
  // useEffect(()=>{
  //   fetch('/api/check')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Server is up:', data);
        
  //       if (!data) {
  //         alert('Server is down! Please try again later.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error checking server:', error);
  //       alert('Server is down! Please try again later.');
  //     });
  // },[])

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-white/5"
      >
        <h2 className="text-3xl font-semibold text-orange-400 text-center mb-6 underline">
          Create an Account
        </h2>

        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
          {['userName', 'fullName', 'email', 'password'].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="text-sm text-orange-300 capitalize mb-1">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                id={field}
                required
                value={formData[field]}
                onChange={handleChange}
                className="bg-black/30 text-white placeholder-gray-400 border border-transparent focus:border-orange-400 outline-none px-4 py-2 rounded-lg transition-all duration-300"
                placeholder={`Enter ${field}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Avatar */}
          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-sm text-orange-300 mb-1">
              Avatar (Max 2MB)
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="text-white file:bg-black/30 file:border-none file:rounded file:px-4 file:py-1 file:text-sm file:text-white file:cursor-pointer"
            />
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
            {preview.avatar && (
              <img
                src={preview.avatar}
                alt="Avatar Preview"
                className="mt-2 h-16 w-16 rounded-full object-cover border-2 border-orange-400"
              />
            )}
          </div>

          {/* Cover Image */}
          <div className="flex flex-col">
            <label htmlFor="coverImage" className="text-sm text-orange-300 mb-1">
              Cover Image (Max 6MB)
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="text-white file:bg-black/30 file:border-none file:rounded file:px-4 file:py-1 file:text-sm file:text-white file:cursor-pointer"
            />
            {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
            {preview.coverImage && (
              <img
                src={preview.coverImage}
                alt="Cover Preview"
                className="mt-2 h-24 w-full rounded-lg object-cover border-2 border-orange-400"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 text-black font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
