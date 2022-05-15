import {Component} from 'react';

import {Query} from 'react-apollo';
import {ALL_CURRENCIES} from '../../../queries/getCurrencies';

import dropdownClose from '../../../img/dropdownClose.svg';
import dropdownOpen from '../../../img/dropdownOpen.svg';
import './Currencies.css';

class Currencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCurrenciesMenu: false,
        }
    }

    render() {
        const {currency, setCurrency} = this.props;
        const {showCurrenciesMenu} = this.state;

        return (
            <div className="currenciesMain">
                {showCurrenciesMenu && (
                    <div
                        onClick={() => this.setState(prev => ({showCurrenciesMenu: !prev.showCurrenciesMenu}))}
                        className="currenciesOverlay"
                    />
                )}
                <div className="currencies">
                    <div>
                        {currency.symbol}
                    </div>
                    <div className="dropdownMenu"
                         onClick={() => this.setState(prev => ({showCurrenciesMenu: !prev.showCurrenciesMenu}))}>
                        {showCurrenciesMenu ?
                            (<img src={dropdownClose} alt="open dropdown menu"/>) : (
                                <img src={dropdownOpen} alt="close dropdown menu"/>)
                        }
                    </div>
                </div>
                {showCurrenciesMenu && (
                    <div className="currencyOptions">
                        <Query query={ALL_CURRENCIES}>
                            {({loading, data, error}) => {
                                if (loading) return 'Loading...';

                                if (error) return (<p>{error.message}</p>);

                                if (data) {
                                    return data.currencies.map((currency) => {
                                        const currenciesOption = () => {
                                            this.setState(prev => ({showCurrenciesMenu: !prev.showCurrenciesMenu}))
                                            setCurrency(currency)
                                        }

                                        return (
                                            <div
                                                key={currency.label}
                                                className="currencyOption"
                                                onClick={currenciesOption}
                                            >
                                                <div className="currencySymbol">{currency.symbol}</div>
                                                <div className="currencyLabel">{currency.label}</div>
                                            </div>
                                        )
                                    })
                                }
                            }}
                        </Query>
                    </div>
                )}
            </div>
        )
    }
}

export default Currencies;