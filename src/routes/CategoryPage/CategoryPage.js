import React from 'react';
import styles from './CategoryPage.less'
import {Modal, Button, Table, message} from 'antd'
import axios from '../../utils/axios'
import CategoryForm from './CategoryForm'

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