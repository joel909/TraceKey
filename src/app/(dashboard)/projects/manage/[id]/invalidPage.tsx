import ErrorCard from "@/components/cards/manage-project-card/ErrorCard";
export default function InvalidManageProjectPage({error,messageLine1,messageLine2,reason,projectId,callback}: {error:string,messageLine1:string,messageLine2:string,reason:string,projectId:string,callback?:()=>void}) {
    return (
            <main className="flex-1 p-6">
                {/* Project Header */}
                <ErrorCard error={error} messageLine1={messageLine1} messageLine2={messageLine2} reason={reason} projectId={projectId} callback={callback} />
            </main>
        )
}