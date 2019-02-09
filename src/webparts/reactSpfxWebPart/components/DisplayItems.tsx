import * as MyModel from '../Model/Mymodel';
import * as React from 'react';

export default class HeroProjectsListComponent extends React.Component<IHeroProjectsListComponentProps, IHeroProjectsListComponentState> {

  // ---------- init ---------------

  constructor(props: IHeroProjectsListComponentProps, state: IHeroProjectsListComponentState) {
    super(props);

    this.state = {
    };
  }

  public componentDidMount() {
  }

  public componentWillReceiveProps(nextProps: IHeroProjectsListComponentProps) {
  }

  private _handleEditHeroProject(item: MyModel.IHeroProjectItem) {
    this.props.editHeroProject(item);
  }

  // ---------- render ---------------

  public render(): React.ReactElement<IHeroProjectsListComponentProps> {

    let heroProjectsCount = 0;

    if (this.props.heroProjects != null) {
      heroProjectsCount = this.props.heroProjects.length;
    }

    return (
      <div>

        <div className={"wbs ms-font-xl"}>
          List of Hero Projects: ({heroProjectsCount})
        </div>

        {
          heroProjectsCount == 0 && (
            <div className={"wbs ms-fontWeight-light"} style={{ color: "red" }}>
              No Hero Projects Found!
            </div>
          )
        }

        {
          heroProjectsCount > 0 && (
            <div className={"tiles_container"}>
              {
                this.props.heroProjects.map((v: MyModel.IHeroProjectItem, i: number) => {
                  return (
                    <div
                      key={i.toString()}
                      className={`tile`}
                      style={{ backgroundColor: v.ProjectColor }}
                    >
                      <div className={`tile_label`} onClick={() => this._handleEditHeroProject(v)}>
                        {v.Title}
                      </div>
                      <div className={"tile_gear"} onClick={() => this._handleEditHeroProject(v)}>
                        <i className="ms-Icon ms-Icon--Settings" aria-hidden="true"></i>
                      </div>
                    </div>
                  );
                })
              }
              <br className={"clearBoth"} />
            </div>
          )
        }

      </div>
    );
  }

}

export interface IHeroProjectsListComponentProps {
  heroProjects: MyModel.IHeroProjectItem[];
  editHeroProject: (item: MyModel.IHeroProjectItem) => any;
}

export interface IHeroProjectsListComponentState {
}
