// CONNECTOR : Navigations list
import React from 'react';
import {connect} from 'react-redux';
import navList from '../redux/navList.duck';
import navListApi from '../api/navList.api';
import Loading from '../views/Loading.jsx';
import List from '../views/List.jsx';

// Controller component
class NavList extends React.Component {

    // constructor
    constructor(props){
        super(props);

        // handling loading
        this.state= {
            loading: false
        }
    }

    // fetch data on mounting
    componentDidMount() {

        // display loading
        this.setState({loading:true});

        try {

            // fetch navigations list (fetch library)
            navListApi.fetch(2)

            // handle server response
            .then(data => {

                // store navigations in redux store
                this.props.saveData(data);

                // hide loading
                this.setState({loading: false})
            });
        }
        catch(e){
            // hide loading
            this.setState({loading: false});
        }
    }

    // render
    render(){

        // render list
        return(
            <div>
                <Loading show={this.state.loading} />
                <List datas={this.props.datas} />
            </div>
        );
    }
}

// connect data from store
const mapStateToProps = (state) => {
    const nav= state.get('navList');

    return {
        datas: nav.navigations
    };
};

// connect dispatch to store
const mapDispatchToProps = (dispatch) => {
    return {
        saveData: (data) => dispatch(navList.receive(data))
    };
};

// connection du composant à redux
export default connect(mapStateToProps, mapDispatchToProps)(NavList);