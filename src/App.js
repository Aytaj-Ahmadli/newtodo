import  React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [todolar, setTodolar] = useState(null);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [duzenlemeVarMi, setDuzenlemeVarMi] = useState(false);
  const [duzenlenecekTodo, setDuzenlenecekTodo] = useState(null);
  const [duzenlenecekTitle, setDuzenlenecekTitle] = useState("");

  const todoSil = (id) => {
    axios
      .delete(`http://localhost:3004/todos/${id}`)
      .then((response) => {
        setResult(true);
        setResultMessage("Silme islemi basarili");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("Silme islemi esnasinda bir hata olustu");
      });
  };
  const changeTodosCompleted = (todo) => {
    console.log(todo);
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, updatedTodo)
      .then((response) => {
        setResult(true);
        setResultMessage("Todo basariyla guncellendi");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("Todo guncellenirken bir hata olustu");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3004/todos")
      .then((response) => {
        console.log(response.data);
        setTodolar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [result]);

  const formuDenetle = (event) => {
    event.preventDefault();
    //validation
    if (title === "") {
      alert("Yapilacak is bos birakilamaz");
      return;
    }
    const newTodo = {
      id: String(new Date().getTime()),
      title: title,
      date: new Date(),
      completed: false,
    };

    axios
      .post("http://localhost:3004/todos", newTodo)
      .then((response) => {
        setTitle("");
        setResult(true);
        setResultMessage("Kayit islemi basarili");
      })
      .catch((error) => {
        setResult(true);
        setResultMessage("Kaydederken bir hata olustu");
      });
  };
  const todoGuncelleFormunuDenetle=(event)=>{
    event.preventDefault()
    if(duzenlenecekTitle === ""){
      alert("Title bos birakilamaz")
      return;
    }
    const updatedTodo ={
      ...duzenlenecekTodo,
      title: duzenlenecekTitle
    }
    axios.put(`http://localhost:3004/todo/${updatedTodo.id}, updatedTodo`)
      .then((response)=>{
      setResult(true)
      setResultMessage("Guncelleme islemi basarili")
      setDuzenlemeVarMi(false)
  })
  .catch((error)=>{
    setResult(true)
    setResultMessage("Guncelleme islemi esnansinda bit hata olustu")
  })
}





  if (todolar === null) {
    return null;
  }

  return (
    <div className="container">
      {result === true && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: " rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div class="alert alert-success" role="alert">
            <p>{resultMessage}</p>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => setResult(false)}
                className="btn btn-sm btn-outline-primary"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row my-5">
        <form onSubmit={formuDenetle}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=" Yapilacak isi girin..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Ekle
            </button>
          </div>
        </form>
      </div>
      {duzenlemeVarMi === true && (
        <div className="row my-5">
          <form onSubmit={todoGuncelleFormunuDenetle}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Yapilacak isi grin..."
                value={duzenlenecekTitle}
                onChange={(event) => setDuzenlenecekTitle(event.target.value)}
              />
              <button
                onClick={() => setDuzenlemeVarMi(false)}
                className="btn btn-danger">
              Vazgec
              </button>
              <button className="btn btn-primary" type="submit">
                Guncelle
              </button>
            </div>
          </form>
        </div>
      )}

      {todolar.map((todo) => (
        <div
          key={todo.id}
          className="alert alert-secondary d-flex justify-content-between align-items-center"
          role="alert"
        >
          <div>
            <h1
              style={{
                textDecoration:
                  todo.completed === true ? "line-through" : "none",
                color: todo.completed === true ? "red" : "black",
              }}
            >
              {todo.title}
            </h1>
            <p>{new Date(todo.date).toLocaleString()}</p>
          </div>
          <div>
            <div class="btn-group" role="group" arial-label="Basic examle">
              <button
                onClick={() => {
                  setDuzenlemeVarMi(true);
                  setDuzenlenecekTodo(todo);
                  setDuzenlenecekTitle(todo.title);
                }}
                type="button"
                className="btn btn-sm btn-warning">
                Duzenle
              </button>
              <button
                onClick={() => todoSil(todo.id)}
                type="button"
                className="btn btn-sm btn-danger">
            Sil
              </button>
              <button 
              onClick={() => changeTodosCompleted(todo)}
              type="button"
               className="btn btn-sm btn-primary">
                {todo.completed === true ? "Yapilmadi" : "Yapildi"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  }

export default App;
