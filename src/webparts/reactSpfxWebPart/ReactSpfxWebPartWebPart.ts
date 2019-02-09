import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, BrowserRouter } from 'react-router-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'reactSpfxWebPartStrings';
import Home from './components/Home';
import { IReactSpfxWebPartProps } from './components/IReactSpfxWebPartProps';
import { IReactSpfxWebPartWebPartProps } from './IReactSpfxWebPartWebPartProps';

export default class ReactSpfxWebPartWebPart extends BaseClientSideWebPart<IReactSpfxWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactSpfxWebPartProps > = React.createElement(
      Home,
      {
        description: this.properties.description,  
        siteurl: this.context.pageContext.web.absoluteUrl,
        listName :this.properties.listName
        //listName :this.properties.listName
      }
     
    );
  
    ReactDOM.render(element,this.domElement);
  }
  
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
          <Route path="/users" component={UsersPage} />
        </main>
      </div>
    )
    
    const HomePage =() => <div>Home Page
      
    </div>
    const UsersPage = () => <div>Users Page</div>
    
    const App = () => (
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    )
    const element: React.ReactElement<IReactSpfxWebPartProps > = React.createElement(
     ReactSpfxWebPart,
      {
        description: this.properties.description,  
        siteurl: this.context.pageContext.web.absoluteUrl
      }
    );
  
    ReactDOM.render(<App/>,this.domElement);
  }*/

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
