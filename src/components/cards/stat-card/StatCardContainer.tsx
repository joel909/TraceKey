export default function StatcardContainer({children}: {children: React.ReactNode}) {
    return(
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {children}
        </div>
    )
}