interface FormContainerProps {
    title : string;
    description: string;
    children: React.ReactNode;
}
export default function FormContainer({ title, description, children }: FormContainerProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md p-8 md:p-10 bg-white rounded-2xl shadow-2xl space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold" style={{ color: "#647FBC" }}>{title}</h2>
                    <p className="text-gray-500 mt-2">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
}