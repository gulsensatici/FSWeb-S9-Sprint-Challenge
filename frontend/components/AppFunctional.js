import React,{useEffect, useState} from 'react'
import axios from 'axios'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const initial={
    email: initialEmail,
    step:initialSteps,
    index:initialIndex,
  }

  const grid=[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]
  const [massage,setMassage]=useState();
  const[result,setResult]=useState(initial);
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    return grid[result.index][0]+","+grid[result.index][1];
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    return massage;
  }

  function reset() {
    setResult(initial);
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(evt) {
    if(evt.target.id ==="left"&&!(result.index %3 ==0)){
      setResult({...result, index:(result.index-1),step:(result.step +1)})
    }
    if(evt.target.id ==="rigth"&&!((result.index +1 )%3 ==0)){
      setResult({...result, index:(result.index+1),step:(result.step +1)})
    }
    if(evt.target.id ==="up"&&!(result.index < 3)){
      setResult({...result, index:(result.index-3),step:(result.step +1)})
    }
    if(evt.target.id ==="down"&&!(result.index > 5)){
      setResult({...result, index:(result.index+3),step:(result.step +1)})
    }
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    console.log(evt.target.id);
    getXYMesaj();
  }

  function onChange(evt) {
    setResult({...result,[evt.target.id]: evt.target.value})
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      "x": grid[result.index][0],
      "y": grid[result.index][1],
      "steps": result.step,
      "email": result.email,
    }
    console.log(data);
    axios
      .post("http://localhost:9000/api/result", data)
      .then((res)=>{
        console.log(res.data)
        setMassage(res.data.message);
      })
  }
  useEffect(()=>{
    console.log("result", result); 
  },[result])
  useEffect(()=>{
    getXYMesaj();
  },[massage])

    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar (2, 2)</h3>
        <h3 id="steps">0 kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">SOL</button>
        <button id="up">YUKARI</button>
        <button id="right">SAĞ</button>
        <button id="down">AŞAĞI</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )

      }