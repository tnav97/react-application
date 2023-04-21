import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import { MemberApplications } from './MemberApplications';
import { withTranslation } from 'react-i18next';
function mapStateToProps({ currentOrganization }: RootReducerState) {
  return {
    organizationId: currentOrganization.currentOrganization?.id,
  };
}

export default connect(
  mapStateToProps,
  undefined
)(withTranslation('MemberApplications')(MemberApplications));
