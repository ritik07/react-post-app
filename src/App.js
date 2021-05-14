import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  //STATES
  const [desc, setDesc] = useState(false);
  const [img, setImg] = useState(false)

  const [postData, setPostData] = useState([])

  const [reRender, setReRender] = useState(false)


  useEffect(() => {
    getAllPost()
  }, []) 

  useEffect(() => {
    if (reRender) {
      setReRender(false)
      getAllPost()
    }
  }, [reRender])

  const getAllPost = () => {
    axios.get(`http://localhost:3000/post/`)
      .then(res => {
        const response = res.data;
        setPostData(response)
      })
  }

  const handleOnSelect = (e) => {
    let file = e.files[0];
    console.log("file", file)
    if (file !== undefined) {
      let reader = new FileReader();
      reader.onloadend = function () {
        setImg(reader.result);
        console.log("data", reader.result)//string
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();//dont reload page

    const payload = {
      img: img,
      desc: desc,
    };

    axios.post(`http://localhost:3000/post/`, payload)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setReRender(true)
      })
  }

  return (
    <div>
      <input name={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="file" onChange={(e) => handleOnSelect(e.target)} />

      <button onClick={handleSubmit}>
        Submit
      </button>

      {postData.map((e) => {
        return (
          <div style={{ justifyContent: "space-evenly" }}>
            <div>
              description: {e.desc}
            </div>
            <div>
              <img src={e.img} />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
