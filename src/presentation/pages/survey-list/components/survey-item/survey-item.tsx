import { Icon, IconName } from '@/presentation/components';
import React from 'react';
import Styles from './survey-item-styles.scss';

const SurveyItem: React.FC = () => {
  return (
    <li>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbDown}/>
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual é seu framework web favorito</p>
      </div>
      <footer>Ver Resultados</footer>
    </li>
  );
};

export default SurveyItem;
