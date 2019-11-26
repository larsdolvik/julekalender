import React from 'react'
import PropTypes from 'prop-types'
import { Container, Sprite } from '@inlet/react-pixi'
import * as utils from './utils'
import treeFar001 from './assets/treeFar001.png'
import treeFar002 from './assets/treeFar002.png'
import treeFar003 from './assets/treeFar003.png'

import treeNear001 from './assets/treeNear001.png'
import treeNear002 from './assets/treeNear002.png'

const allTrees = {
    near: [
        { src: treeNear001, w: 358, h: 444, y: 255 },
        { src: treeNear002, w: 358, h: 444, y: 255 },
    ],
    far: [
        { src: treeFar001, w: 252, h: 291, y: 240 },
        { src: treeFar002, w: 250, h: 343, y: 240 },
        { src: treeFar003, w: 68, h: 113, y: 230 }
    ]
}

export default class Trees extends React.PureComponent {

    constructor() {
        super()
        this.state = { trees: [] }
        this.removeTree = this.removeTree.bind(this)
        this.makeTree = this.makeTree.bind(this)
        this.makeTrees = this.makeTrees.bind(this)
    }

    componentDidMount() {
        this.makeTrees()
        this.props.app.ticker.add(this.tick)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.numFactor !== this.props.numFactor) {
            this.makeTrees()
        }
    }

    componentWillUnmount() {
        this.props.app.ticker.remove(this.tick)
    }

    tick = delta => {
        const trees = this.state.trees.map((tree) => {
            const speed = this.props.fod === 'near' ? 1 * delta : 0.3 * delta
            tree.x = tree.x - speed
            if (tree.x + tree.w <= 0) {
                tree.x = utils.makeRandom(window.innerWidth, 100)
            }
            return tree
        })
        this.setState({ trees })
    }
    // TODO ?
    removeTree() { }

    makeTree(currentTree, index) {
        const scale = (this.props.fod === 'near' ? 0.2 + Math.random() * 0.5 : 0.5 + Math.random() * 0.1).toFixed(2)
        // console.log(scale)
        const { src, w, h, y } = currentTree
        const tree = {
            src,
            w,
            h,
            scale,
            name: `treeMovieClip${index}`,
            x: utils.makeRandom(100, window.innerWidth) + 200 * index,
            y: y + Math.random() * 50,
        }
        return tree
    }
    makeTrees() {
        const trees = []
        const { numFactor, fod } = this.props
        const perc = (100 * numFactor)
        const numTrees = Math.floor(perc / 10)
        for (let i = 0; i < numTrees; i++) {
            const currentTreeArray = allTrees[fod]
            const currentTree = currentTreeArray[Math.floor(Math.random() * currentTreeArray.length)]
            trees.push(this.makeTree(currentTree, i))
        }
        trees.sort((a, b) => a.scale - b.scale)
        this.setState({ trees })
    }
    renderTrees() {
        return this.state.trees
            .map(tree => {
                return (
                    <Sprite
                        anchor={[0.5, 1]}
                        key={tree.name}
                        image={tree.src}
                        scale={[tree.scale, tree.scale]}
                        x={tree.x}
                        y={tree.y}
                    />
                )
            })
    }
    render() {
        const { app } = this.props
        const { renderer } = app
        const { view } = renderer
        const { height } = view
        return (
            <Container y={height - 400}>
                {this.renderTrees()}
            </Container>
        )

    }
}

Trees.propTypes = {
    app: PropTypes.object,
    fod: PropTypes.string,
    numFactor: PropTypes.number,
}

Trees.defaultProps = {
    fod: 'far',
    numFactor: 0,
}