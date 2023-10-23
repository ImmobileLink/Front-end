"use client";

interface SetEmailProps {
    register: any;
    errors: any;
}

export default function SetEmail({ register, errors }: SetEmailProps) {
    return (
        <>
            <div className="flex flex-col">
                <label className="text-gray-500 dark:text-gray-300">Email</label>
                <input
                    type="email"
                    required
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        },
                    })}
                    className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
            </div>
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </>
    );
}
