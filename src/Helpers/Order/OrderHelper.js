/* eslint camelcase: 0 */
import * as ServicePortalApi from '@manageiq/service-portal-api';
import { SERVICE_PORTAL_API_BASE } from '../../Utilities/Constants';

let api = new ServicePortalApi.AdminsApi();

const sspDefaultClient = ServicePortalApi.ApiClient.instance;
sspDefaultClient.basePath = SERVICE_PORTAL_API_BASE;

export function getServicePlans(portfolioItemId) {
  return api.fetchPlansWithPortfolioItemId(portfolioItemId).then(data => data, error => console.error(error));
}

export function listOrders() {
  return api.listOrders().then(data => data, error => console.error(error));
}

export async function sendSubmitOrder(parameters) {
  let order = await api.newOrder();
  let orderItem = new ServicePortalApi.OrderItem;
  orderItem.count = 1;
  orderItem.provider_control_parameters =  { namespace: 'default' };
  orderItem.portfolio_item_id = parameters.portfolio_item_id;
  orderItem.service_plan_ref = parameters.service_plan_ref;
  orderItem.service_parameters = parameters.service_parameters;
  await api.addToOrder(order.id, orderItem);
  return api.submitOrder(order.id).then(result => result, error => console.error(error));
}
