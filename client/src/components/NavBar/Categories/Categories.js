import {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query} from 'react-apollo';
import {ALL_CATEGORIES} from '../../../queries/getCategories';

import './Categories.css';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        }
    }

    render() {
        const {hideMiniCart} = this.props.context;
        const {activeIndex} = this.state;

        return (
            <div className="categories">
                <Query query={ALL_CATEGORIES}>
                    {({loading, data, error}) => {
                        if (loading) return 'Loading...';

                        if (error) return (<p>{error.message}</p>);

                        if (data) return data.categories.map((category, index) => {

                            const handleClick = (index) => {
                                this.setState({activeIndex: index});
                                hideMiniCart();
                            }

                            const categoryClass = activeIndex === index ? 'activeCategory' : 'category';

                            return (
                                <Link key={index} to={`/${category.name}`}>
                                    <div
                                        className={categoryClass}
                                        onClick={() => handleClick(index)}
                                    >
                                        <p>{category.name.toUpperCase()}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }}
                </Query>
            </div>
        )
    }
}

export default Categories;