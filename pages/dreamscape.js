import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";

export default function Imagine() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getDalle2() {
    console.log(prompt);
    if (prompt != "") {
      setError(false);
      setLoading(true);
      axios
        .post(`/api/imagine?q=${prompt}`)
        .then((res) => {
          setResults(res.data.modelOutputs);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  }

  const [type, setType] = useState("png");

  function download(url) {
    axios
      .post(`/api/download`, { url: url, type: type })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.result;
        link.download = `${prompt}.${type.toLowerCase()}`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* <Nav /> */}
      <Header>
        <h1>Dreamscape</h1>
        {/* <hr className="small" /> */}
        <span className="subheading">Intelligence art at your fingertips</span>
        <br />
        <div className="form-group">
          <input
            className="form-control"
            id="prompt"
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        <center>
          <button className="btn btn-primary" onClick={getDalle2}>
            Generate
          </button>
        </center>
        {error ? (
          <div className={styles.error}>Something went wrong. Try again.</div>
        ) : (
          <></>
        )}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          {results.map((result, idx) => {
            return (
              <div key={idx} className={styles.card}>
                <Image
                  unoptimized
                  fill
                  className={styles.imgPreview}
                  src={`data:image/png;base64, ${result.image_base64}`}
                  onClick={() => download(result.image_base64)}
                />
              </div>
            );
          })}
        </div>
      </Header>
      {/* <br /><br /> */}
      <hr />
      <Footer />
    </>
  );
}
