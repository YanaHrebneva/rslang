import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

export default function HomePage() {
  return (
    <div className="main-wrapper">
      <div className="main-block">
        <div className="main-text-wrapper">
          <h1 className="main-title">Выучи английский с LearnEnglish</h1>
          <p className="main-text">
            Нескучное онлайн-обучение английскому
            языку с помощью игр и интересных заданий в любое удобное для вас время
          </p>
          <Link to="/book"><button type="button">Начать заниматься</button></Link>
        </div>
        <img className="main-img" src="assets/images/FloatDoodle.png" alt="main" />
      </div>
      <div className="options-block">
        <h2 className="block-title">Прокачай свой английский</h2>
        <span className="main-text">мы знаем как это сделать</span>
        <div className="options-wrapper">
          <div className="option">
            <h3 className="option-title">Учебник</h3>
            <span className="option-description">Несколько тысяч слов, разделенных по уровням сложности</span>
            <img className="option-img" src="assets/images/SitReadingDoodle.png" alt="" />
          </div>
          <div className="option">
            <h3 className="option-title">Мини-игры</h3>
            <span className="option-description">Изучай новые слова посредством интересных игр</span>
            <img className="option-img" src="assets/images/ZombieingDoodle.png" alt="" />
          </div>
          <div className="option">
            <h3 className="option-title">Статистика</h3>
            <span className="option-description">Отслеживай свой прогресс и стремись к новым целям!</span>
            <img className="option-img" src="assets/images/ReadingDoodle.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
