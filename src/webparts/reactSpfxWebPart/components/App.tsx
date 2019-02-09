import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, BrowserRouter } from 'react-router-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import {
  PrimaryButton, DefaultButton,
  Label
} from 'office-ui-fabric-react/lib';

import * as MyModel from '../Model/Mymodel';
import pnp from "sp-pnp-js";
import HeroProjectsEditorComponent from './AddUpdateListItem';
import HeroProjectsListComponent from './DisplayItems';
//Interface to access properties passed from App Component
export interface IAppComponentProps {
  url: string;
  ListName:string;
}
//Interface to define elements while adding and accessing items
//This model is similar to .net model and maintains the data 
export interface IAppComponentState {
  heroProjects: MyModel.IHeroProjectItem[];
  heroProject: MyModel.IHeroProjectItem;
  showHeroProjectEditor: boolean;
}
//App Component calls other components by setting the state. It is responsible to render the other components
export default class AppComponent extends React.Component<IAppComponentProps,IAppComponentState>
{
  constructor(props: IAppComponentProps, state: IAppComponentState) {
    super(props);
//initializing default state
    this.state = {
      heroProjects: [],
      heroProject: null,
      showHeroProjectEditor: false
    };
  }
  public render(): React.ReactElement<IAppComponentProps> {
    return(<div>
     <div className={"wbs ms-font-xxl"}>
          Hero Projects
        </div>

        <div className={"wbs ms-fontWeight-light"}>
          Welcome to the Coaching Notes application.
        </div>

        <div className="wbs">
          <PrimaryButton
            text={"Add Hero Project"}
            onClick={this._handleAddHeroProject.bind(this)}
          />
        </div>
        <div>
          
          <HeroProjectsEditorComponent
          /*  passing properties to component , which forms the interface for HeroProjectEditorComp*/
            listName={this.props.ListName}
            heroProject={this.state.heroProject}
            showHeroProjectEditor={this.state.showHeroProjectEditor}
            onCloseForm={this._handleCloseForm.bind(this)}
            onAddNewItem={this._handleAddNewItem.bind(this)}
            onUpdateItem={this._handleUpdateItem.bind(this)}
          />
        </div>
        <div>
          <HeroProjectsListComponent
            heroProjects={this.state.heroProjects}
            editHeroProject={this._handleEditHeroProject.bind(this)}
          />
        </div>

      </div>);
  }

   // ---------- editor panel functions ---------------
   //Below is used to show hide by setting the state 
   private _handleEditHeroProject(item: MyModel.IHeroProjectItem) {
    
        this.setState(x => {
          x.showHeroProjectEditor = true;
          x.heroProject = item;
          x.heroProject._isNewItem = false;
          return x;
        });
      }
   private _handleAddHeroProject() {
    this.setState(x => {
      x.showHeroProjectEditor = true;
      x.heroProject = null;
      return x;
    });
  }

  private _handleCloseForm() {
    this.setState(x => {
      x.showHeroProjectEditor = false;
      return x;
    });
  }

  private _handleAddNewItem() {

    this.setState(x => {
      x.showHeroProjectEditor = false;
      return x;
    });

    this.getItems();
  }

  private _handleUpdateItem() {

    this.setState(x => {
      x.showHeroProjectEditor = false;
      return x;
    });

    this.getItems();
  }
// ---------- get items from SP List while updating items---------------

private getItems() {
  alert("getItems App Hero List"+ this.props.ListName);
      pnp.sp.web.lists.getByTitle(this.props.ListName).items.orderBy("Title").get().then((results: MyModel.IHeroProjectItem[]) => {
  
        this.setState(x => {
          x.heroProjects = results;
          return x;
        });
  
      });
    }
  /*  public render(): React.ReactElement<IAppComponentProps> {
      
  const PrimaryLayout = () => (
    <div className="primary-layout">
      <header>
        Our React Router 4 App
        <Link to="/users">Users</Link>
        <br/>
        <Link to="/">Home</Link>
      </header>
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Home} />
      </main>
    </div>
  )
        return (
          <BrowserRouter>
          <PrimaryLayout />
        </BrowserRouter>
          
          );

    }*/
/*public render(): void {
    const PrimaryLayout = () => (
      <div className="primary-layout">
        <header>
          Our React Router 4 App
          <Link to="/users">Users</Link>
          <br/>
          <Link to="/">Home</Link>
        </header>
        <main>
          <Route path="/" exact component={ReactSpfxWebPart} />
          <Route path="/" exact component={ReactSpfxWebPart} />
         
        </main>
      </div>
    );
}*/
}