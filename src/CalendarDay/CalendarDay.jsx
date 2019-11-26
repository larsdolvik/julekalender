import React, { Component } from 'react';
import './CalendarDay.css';

import heartIcon from '../images/icons/heart.svg';

class CalendarDay extends Component {
  handleClick = () => {
    const { setActiveDay, id, mainImage, secondaryImage, text } = this.props;
    window.history.pushState({}, '', `#luke${id}`);
    setActiveDay({ id, mainImage, secondaryImage, text });
  };

  render() {
    const { opened, id } = this.props;
    const isOpened = opened.includes(id);

    const openedClass = isOpened ? 'calendar-day--opened' : '';

    return (
      <button className={`calendar-day ${openedClass}`} onClick={this.handleClick} type="button">
        {!isOpened && this.props.id}
        {isOpened && <img src={heartIcon} alt="heart" className="calendar-day-heart" />}
      </button>
    );
  }
}

export default CalendarDay;
