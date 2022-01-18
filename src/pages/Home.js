import React from "react";
import employees from "../data/employees.json"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.exportDataToPdf = this.exportDataToPdf.bind(this);
    }

    async exportDataToPdf() {
        var docDef = {
            pageSize: 'A4',
     
            //pageOrientation: 'landscape',

            defaultStyle: {
                fontSize: 8,
                bold: false,
                border:4,
            },

            content: [
                // margin: [left, top, right, bottom]
                { text: 'List of Woomi employees', alignment: 'center', bold: true, fontSize: '16', margin: [0, 0, 0, 10]},

                {
                    image: await this.getBase64ImageFromURL("http://localhost:3000/images/employees.png")
                },

                {
                    layout: 'lightHorizontalLines',

                    table: {
                        headerRows: 1,
                        widths: [ '*', '*', '*', '*', '*', '*', '*' ],
                
                        body: [
                            [ 
                                { text: 'First Name', bold: true }, { text: 'Last Name', bold: true}, { text: 'Position', bold: true},
                                { text: 'Office', bold: true}, { text: 'Age', bold: true}, { text: 'Start Date', bold: true}, { text: 'Salary', bold: true} ],
                            ...employees.map( (employee) => [
                                employee.firstName,
                                employee.lastName,
                                employee.position,
                                employee.office,
                                employee.age,
                                employee.startDate,
                                employee.salary + ' F CFA'
                            ])
                        ]
                    }
                }
            ]
        }

        pdfMake.createPdf(docDef).download();
    }

    getBase64ImageFromURL(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
        
            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
        
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 30, 30, 500, 500);
        
                var dataURL = canvas.toDataURL("image/png");
        
                resolve(dataURL);
            };
        
            img.onerror = error => {
                reject(error);
            };
        
            img.src = url;
        });
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a className="navbar-brand" href="#">Woomi</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Parteners</a>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        </div>
                    </nav>
                </header>

                <main role="main" className="container">
                    <h2 className="text-center mt-5 mb-3">List of Woomi employees</h2>
                    <div className="text-center">
                        <button type="button" className="mb-3 btn btn-primary" onClick={this.exportDataToPdf}>
                            Export to PDF
                        </button>
                    </div>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start Date</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map( (employee) => {
                                    return (
                                        <tr key={employee.id}>
                                            <td>{ employee.firstName }</td>
                                            <td>{ employee.lastName }</td>
                                            <td>{ employee.position }</td>
                                            <td>{ employee.office }</td>
                                            <td>{ employee.age }</td>
                                            <td>{ employee.startDate }</td>
                                            <td>{ employee.salary } F CFA</td>
                                        </tr>   
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </main>

                <footer className="footer">
                    <div className="container">
                        <span className="text-muted">Powered by @woomi | contact@woomi.net</span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Home;