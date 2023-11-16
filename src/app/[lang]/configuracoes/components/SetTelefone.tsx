import React from 'react';
import InputMask from 'react-input-mask';

interface SetTelefoneProps {
    register: any;
    errors: any;
    type: string;
}

export default function SetTelefone({ register, errors, type }: SetTelefoneProps) {
    return (
        <>
            <div className="flex flex-col gap-3">

                {type == "corretor" ? (
                    <>
                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Telefone</label>
                            <InputMask
                                mask="(99) 9999-9999"
                                type="text"
                                required
                                {...register('telefone')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Celular</label>
                            <InputMask
                                mask="(99) 99999-9999"
                                type="text"
                                required
                                {...register('celular')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Comercial</label>
                            <InputMask
                                mask="(99) 9999-9999"
                                type="text"
                                required
                                {...register('telefone_comercial')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Telefone 1</label>
                            <InputMask
                                mask="(99) 9999-9999"
                                type="text"
                                required
                                {...register('telefone_1')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Telefone 2</label>
                            <InputMask
                                mask="(99) 9999-9999"
                                type="text"
                                required
                                {...register('telefone_2')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>

                        <div>
                            <label className="text-gray-500 dark:text-gray-300">Telefone 3</label>
                            <InputMask
                                mask="(99) 9999-9999"
                                type="text"
                                required
                                {...register('telefone_3')}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `}
                            />
                        </div>
                    </>
                )}

            </div>
            {errors?.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}
        </>
    );
}
