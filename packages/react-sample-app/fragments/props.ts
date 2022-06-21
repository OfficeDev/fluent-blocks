import {Router} from "next/router";

export interface FragmentProps extends Pick<Router, 'pathname' | 'query'> {}