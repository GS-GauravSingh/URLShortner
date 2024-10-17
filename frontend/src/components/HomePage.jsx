// import React from 'react'
import "../css/homePage.css"
import "../css/mediaQueries.css"

function HomePage() {
    return (
        <>
            <header>
                <h1 className="heading">URL Shortner</h1>
                <h3 className="tagline">Shorten it, share it, track it.</h3>
            </header>

            <main>

                {/* URL Container */}
                <div className="url-container">
                    <div>
                        <h3 className="sub-heading"><span>From long to short -</span> <span>in just one click.</span></h3>
                        <form action="">
                            <input type="url" name="url" id="inputURL" placeholder="Enter the link here" aria-label="Enter the link here" />
                            <button type="submit">Shorten URL</button>
                        </form>

                        <p>Turn long web addresses into short, easy-to-share links. Keep track of how many times your links are clicked to see what&apos;s popular!</p>
                    </div>
                </div>

                {/* Table for displaying short links */}
                <div className="table-container-wrapper">
                    <div className="table-container">
                        <table>

                            {/* Table Header */}
                            <thead>
                                <th>S. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>URL</th>
                                <th>Shorten URL</th>
                                <th>Clicks</th>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {/* <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td>https://example.com/123234235245345346567547</td>
                                    <td>http://localhost:8000/axedas</td>
                                    <td>0</td>
                                </tr> */}
                                
                            </tbody>

                            {/* Table Footer */}
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>Total Links Shorten</td>
                                    <td>0</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage