import React from 'react';
import styles from './TypePage.less'
import {Modal, Button, Table, message} from 'antd'
import axios from '../../utils/axios'
import TypeForm from './TypeForm'

class TypePage extends React.Component {
    constructor(){
        super();
        this.state = {
            ids:[],
            list:[],
            loading:false,
            visible:false,
            type:{}
        }
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {

    }

    handleBatchDelete
}