import CORE from './config/core'
import { GetRoute, RouteProcessor, HomeRouteMatcher } from 'boiler-ui/lib/tools'

// stuff to do with prepending the basepath (so the routes read nicely)
export const routeProcessor = RouteProcessor(CORE.basepath)
export const getRoute = GetRoute(CORE.basepath)
export const homeRouteMatcher = HomeRouteMatcher(CORE.basepath)