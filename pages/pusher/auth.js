export default function auth() {
    console.log("nice.");
    return (
        <div>
            Enter
        </div>
    );
}

export async function getServerSideProps(ctx) {
    console.log("nice....");

    return {
        props: {
            data: null
        }
    }
}
