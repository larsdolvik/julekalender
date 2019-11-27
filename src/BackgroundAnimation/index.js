import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import StageView from './StageView'
import Footer from './Footer'

// import { getNumFactor } from '../../api/teamsApi';

import styles from './styles.css'
import './styles.css'

class BackgroundAnimation extends PureComponent {
    constructor(props) {
        super(props)
        this.interval = null
        this.state = {
            numFactor: 1
        }
    }
    componentDidMount() {
        // this.getTeamsNumfactor()
        // this.interval = setInterval(() => {
        // this.getTeamsNumfactor()
        // }, 30000);
    }
    componentWillUnmount() {
        if(this.interval){
            clearInterval(this.interval)
            this.interval = null
        }
    }
//     getTeamsNumfactor = () => {
//         if (localStorage.getItem('user')) {
//             getNumFactor()
//             .then(result => {
//                 this.setState({ numFactor: result })
//             })
//             .catch(error => console.log(error))
//         } else {
//             this.setState({ numFactor: 0 })
//         }
//   };

    render() {
        const { children, gameOver } = this.props
        return (<div className='backgroundAnimation'>
            <h1 className="title">Lauras julekalender</h1>
            <StageView {...this.state} />
            <div className={styles.mainLayout}>
                {!!children && children}
            </div>
            {/* <div className={styles.factorInput}>
                <div>Factor: {this.state.numFactor}</div>
                <input
                id="factor"
                type="range"
                min="0.0"
                max="1.0"
                value={this.state.numFactor}
                onChange={onSliderChange}
                step="0.1" />
            </div> */}

        </div>)
    }
}

BackgroundAnimation.propTypes = {
    gameOver: PropTypes.bool,
    onSliderChange: PropTypes.func,
    children: PropTypes.node,
    numFactor: PropTypes.number
}
// numFactor = 0 - 1 -> bad - good 
BackgroundAnimation.defaultProps = {
    children: null,
    // @numFactor default value should be 0
    numFactor: 0.1 // - initial value for testing
}

export default BackgroundAnimation