import { useState } from 'react';
import Styles from './App.module.css'

import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'

import {levels, CalculateImc, level} from './helpers/imc'
import {GridItem} from './components/GridItem'

const App = () => {
  const [heightField, setHepghtField] = useState<number>(0);
  const [widthField, setWidthField] = useState<number>(0);
  const [toShow, setToshow] = useState<level | null>(null)

  const handleCalculeteButton = () => {
    if(widthField && heightField){
      setToshow( CalculateImc(heightField, widthField))
    }else {
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () => {
    setToshow(null);
    setHepghtField(0);
    setWidthField(0)
  }

  return (
    <div className={Styles.main}>
    <header>
      <div className={Styles.headerContainer}>
          <img src={poweredImage} width={150} alt="" />
      </div>
    </header>
    <div className={Styles.container}>
      <div className={Styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para Indice de Massa Corpórea, parámetro
            adotado pela Organização Mundial de Saúde para 
            Calcular o peso ideal de cada pessoa.
          </p>

          <input 
          type="number" 
          placeholder="Digite a sua altura. Ex: 1.5 (em métros)" 
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHepghtField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <input 
          type="number" 
          placeholder="Digite a seu peso. Ex: 70.3 (em kg)" 
          value={widthField > 0 ? widthField : ''}
          onChange={e => setWidthField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button  onClick={handleCalculeteButton} disabled={toShow ? true : false} >Calcular</button>

      </div>
      <div className={Styles.rightSide}>
        {!toShow &&
          <div className={Styles.grid}>
            {levels.map((item, key) => (
              <GridItem  key={key} item={item}/>
            ))}
          </div>
          }
          {toShow &&
            <div className={Styles.rightBig}>
              <div className={Styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
                <GridItem item={toShow}/>
            </div>
          }
      </div>
    </div>

    </div>
  )
}

export default App