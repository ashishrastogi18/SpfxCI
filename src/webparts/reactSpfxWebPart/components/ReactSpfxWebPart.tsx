import * as React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom';
import styles from './ReactSpfxWebPart.module.scss';
import { IReactSpfxWebPartProps } from './IReactSpfxWebPartProps';
import * as jquery from 'jquery';
import * as pnp from 'sp-pnp-js';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Button } from 'office-ui-fabric-react/lib/components/Button';

export interface IReactSpfxState{  
  items:[  
        {  
          "Courses": "", 
          "Credit": "", 
          "Department":"",
        }]  
}  

export default class ReactGetItems extends React.Component<IReactSpfxWebPartProps, IReactSpfxState> {

  public constructor(props: IReactSpfxWebPartProps, state: IReactSpfxState){  
    super(props); 
    
    this.state = {  
      items: [  
        {  
          "Courses": "", 
          "Credit": "", 
          "Department":"",
         
        }  
      ]  
    };  
  }  
  
 
 
  private componentDidMount() {
     setInterval(
      () => this.fetchDatafromSharePointList(),
      1000
    );
  }

private fetchDatafromSharePointList()
{

  /*pnp.sp.web.lists.getByTitle("CourseDetails").items.get().then(r => {
    //console.log(r);
    for (var i = 0; i < r.length; i++) {
        console.log(r[i].Title);
    }
});*/
  var reactHandler = this;  
  //alert(this.props.siteurl);
    jquery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('CourseDetails')/items`, 
        //url: `https://ashish345.sharepoint.com/sites/intranet/_api/web/lists/getbytitle('CourseDetails')/items`, 
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success: function(resultData) {  
          /*resultData.d.results;*/  
          reactHandler.setState({  
            items: resultData.d.results  
          });  
        },  
        error : function(jqXHR, textStatus, errorThrown) {  
        }  
    });  
}

  public render(): React.ReactElement<IReactSpfxWebPartProps> {
    /*var Home = React.createClass({
      render: function() {
        return (<h1>Welcome to the Home Page</h1>);
      }
    });
   
    var Address = React.createClass({
      render: function() {
        return (<div className={styles.panelStyle} > 
          <br></br>
   
          <br></br> 
          <div className={styles.tableCaptionStyle} >I am Address Component  </div>
          <br></br>
           <div className={styles.headerCaptionStyle} >Course Details</div>
          <div className={styles.tableStyle} >   
            
            <div className={styles.headerStyle} >  
              <div className={styles.CellStyle}>Courses</div>  
              <div className={styles.CellStyle}>Credit </div>  
              <div className={styles.CellStyle}>Department</div>  
                
                     
            </div>  
            
              {this.state.items.map(function(item,key){  
                
                return (<div className={styles.rowStyle} key={key}>  
                    <div className={styles.CellStyle}>{item.Courses}</div>  
                    <div className={styles.CellStyle}>{item.Credit}</div>  
                     <div className={styles.CellStyle}>{item.Department}</div>
   	 	              
   	 	  
                  </div>);  
              })}  
                    
          </div>  
        </div>  );
      }
    });*/
     return (  

        <div className={styles.panelStyle} > 
          <br></br>
          <div><Label>I am a office ui fabric label. CI CD</Label></div>
          <div><Button>I am a office ui fabric button.</Button></div>
          <br></br> 
          <div className={styles.tableCaptionStyle} >Fetch Course Details from SharePointList using SPFx,RESTAPI,React JS
            Data on page changes with change in the SharePointList CI </div>
          <br></br>
           <div className={styles.headerCaptionStyle} >Course Details</div>
          <div className={styles.tableStyle} >   
            
            <div className={styles.headerStyle} >  
              <div className={styles.CellStyle}>Courses</div>  
              <div className={styles.CellStyle}>Credit </div>  
              <div className={styles.CellStyle}>Department</div>  
                
                     
            </div>  
            
              {this.state.items.map(function(item,key){  
                
                return (<div className={styles.rowStyle} key={key}>  
                    <div className={styles.CellStyle}>{item.Courses}</div>  
                    <div className={styles.CellStyle}>{item.Credit}</div>  
                     <div className={styles.CellStyle}>{item.Department}</div>
   	 	              
   	 	  
                  </div>);  
              })}  
                    
          </div>  
        </div>  


    ); 

  /*return (
      <Router history={hashHistory}>
        <Route path="" component={Home} />
        
      </Router>
    );*/
    
  }  
  
}
