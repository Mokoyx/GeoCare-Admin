import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import { db } from "./config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import GaugeChart from "react-gauge-chart";

function Users() {
  const [toggle, setToggle] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      const querySnapshot = await getDocs(collection(db, "reports"));
      const data = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => (a.done ? 1 : -1));
      setReports(data);
      console.log(data);
    };
    getReports();
  }, []);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleDoneReports = async (id) => {
    try {
      await updateDoc(doc(db, "reports", id), { done: true });
    } catch (error) {
      setError(error.message);
      console.error("Error updating report: ", error);
    }
  };

  const doneCount = reports.filter((report) => report.done).length;
  const undoneCount = reports.filter((report) => !report.done).length;
  const totalCount = reports.length;

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-12 col-md-4 col-lg-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        {toggle && <div className="col-12 col-md-4 col-lg-2"></div>}
        <div className="col">
          <div className="px-3">
            <Nav Toggle={Toggle} />

            <div className="card-container d-flex flex-wrap justify-content-evenly mt-4 mb-3">
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="waste-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.waste).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.waste).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">Waste Management</h5>
                  <p className="card-text">
                    {reports.filter((report) => report.waste).length}
                  </p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="police-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.police).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.police).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">Police Assistance</h5>
                  <p className="card-text">
                    {reports.filter((report) => report.police).length}
                  </p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="aid-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.aid).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.aid).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">First Aid Rescue</h5>
                  <p className="card-text">{reports.filter((report) => report.aid).length}</p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="fire-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.fire).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.fire).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">Fire Emergency</h5>
                  <p className="card-text">
                    {reports.filter((report) => report.fire).length}
                  </p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="calamity-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.calamity).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.calamity).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">Calamity/Flood</h5>
                  <p className="card-text">
                    {reports.filter((report) => report.calamity).length}
                  </p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="traffic-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={reports.filter((report) => report.traffic).length / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">
                      {Math.round(
                        (reports.filter((report) => report.traffic).length / totalCount) * 100
                      )}
                      %
                    </p>
                  </div>
                  <h5 className="card-title">Traffic Management</h5>
                  <p className="card-text">
                    {reports.filter((report) => report.traffic).length}
                  </p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="done-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={doneCount / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">{Math.round((doneCount / totalCount) * 100)}%</p>
                  </div>
                  <h5 className="card-title">Done</h5>
                  <p className="card-text">{doneCount}</p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <div className="gauge-container">
                    <GaugeChart
                      id="undone-gauge"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={undoneCount / totalCount}
                      needleColor="#345243"
                      textColor="transparent"
                    />
                    <p className="gauge-percent">{Math.round((undoneCount / totalCount) * 100)}%</p>
                  </div>
                  <h5 className="card-title">Undone</h5>
                  <p className="card-text">{undoneCount}</p>
                </div>
              </div>
              <div className="card col-6 col-sm-4 col-md-3 col-lg-2 p-3 mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Reports</h5>
                  <p className="card-text fs-4">{totalCount}</p>
                </div>
              </div>
            </div>

            <table className="table caption-top bg-white rounded mt-6">
              <caption className="text-white fs-4">Reports</caption>
              {error && <div className="alert alert-danger">{error}</div>}
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Report</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.date}</td>
                    <td>{report.reportText}</td>
                    <td>
                      {report.waste && <div>Waste Management</div>}
                      {report.police && <div>Police Assistance</div>}
                      {report.aid && <div>First Aid Rescue</div>}
                      {report.fire && <div>Fire Emergency</div>}
                      {report.calamity && <div>Calamity/Flood</div>}
                      {report.traffic && <div>Traffic Management</div>}
                    </td>
                    <td className={report.done ? "text-success" : "text-secondary"}>
                      {report.done ? "Done" : "Pending"}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDoneReports(report.id)}
                        disabled={report.done}
                      >
                        {report.done ? "Done" : "Mark as Done"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
