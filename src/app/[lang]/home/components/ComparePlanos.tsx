interface ComparePlanosProps {}

export default function ComparePlanos({}: ComparePlanosProps) {
    return (
        <>
            <div
                id="premium-resources"
                className="flex flex-col px-12 md:text-left text-center py-8"
            >
                <div className="md:flex md:flex-row">
                    <div className="md:pl-8">
                        <p className="text-xl font-semibold pb-8 md:pt-12 md:text-2xl">
                            Compare e se surpreenda
                        </p>
                        <p className="pb-4 text-lg">
                            Você pode definir seu plano conforme suas necessidades e alterá-lo sempre que quiser.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
