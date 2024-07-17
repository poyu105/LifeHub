export default function PageHeader({title}){
    return (
        <>
            <div className="w-10/12 mx-auto mt-3">
                <h1>{/* Bootstrap icon */}<i className="bi bi-caret-right"></i>{title}</h1>
                <hr/>
            </div>
        </>
    )
}