import "../css/footer.css"

function Footer() {
    return (
        <footer className='footer'>
            <span style={{ fontWeight: "bold", letterSpacing: "1px" }}>URL Shortner</span>
            <span>&nbsp;| Made by&nbsp;
                <span style={{ fontWeight: "bold", letterSpacing: "1px" }}>Gaurav Singh</span>
            </span>
        </footer>
    )
}

export default Footer