import React ,{Component} from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

import Iframe from 'react-iframe'

//component
import ListProfile  from  "../component/content/list/listprofile"

import Profileaction from  "../action/profil"


export default class Tentang extends Component {
    constructor(props){
        super(props)
        this.state = {
            profil : [],
     
        }
    }
    componentDidMount() {
        this.getdata()
    }
     getdata(){
        Profileaction.get("").then((Response)=>{
            if(Response.code ==200){
                this.setState({profil:Response.result})
            }
        })
       
    }
    render () {
        return (
            <div className="fl w-100 pa5 animated fadeInUp">
                <center>
                    <h1>Tentang Vihara</h1>
                </center>
                 <Tabs>
                    <TabList>
                        <Tab>Sejarah Vihara</Tab>
                        <Tab>Lokasi</Tab>
                        <Tab>Profil sangha</Tab>
                    </TabList>

                    <TabPanel>
                        <center>
                            <h2>Sejarah</h2>
                        </center>
                        <div className="fl w-25 pa2">
                            <img src="/images/item/building.png"/>
                        </div>
                        <div className="fl w-75 pa2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius aperiam necessitatibus vero corporis nostrum, hic saepe odit cupiditate id debitis minus molestiae eveniet quasi pariatur est consequatur fuga aliquam!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius aperiam necessitatibus vero corporis nostrum, hic saepe odit cupiditate id debitis minus molestiae eveniet quasi pariatur est consequatur fuga aliquam!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius aperiam necessitatibus vero corporis nostrum, hic saepe odit cupiditate id debitis minus molestiae eveniet quasi pariatur est consequatur fuga aliquam!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius aperiam necessitatibus vero corporis nostrum, hic saepe odit cupiditate id debitis minus molestiae eveniet quasi pariatur est consequatur fuga aliquam!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius aperiam necessitatibus vero corporis nostrum, hic saepe odit cupiditate id debitis minus molestiae eveniet quasi pariatur est consequatur fuga aliquam!
                        </div>
                        
                    </TabPanel>
                    <TabPanel>
                        <center>
                            <h2>Lokasi</h2>
                        </center>
                        <div className="fl w-100 pa2">
                            <Iframe url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15927.26427799865!2d98.6609568!3d3.6294412!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x718f1776de62be7!2sVihara+White+Dragon+King!5e0!3m2!1sid!2sid!4v1506737299424"
                                width="100%"
                                height="450px"
                                display="initial"
                                position="relative"
                                />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <center>
                            <h2>Profil sangha</h2>
                            <ListProfile profil={this.state.profil}/>
                        </center>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
