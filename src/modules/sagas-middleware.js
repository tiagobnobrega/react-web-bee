import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'

export const sagaMiddleware = createSagaMiddleware();
export const initSagas = ()=> sagaMiddleware.run(rootSaga);

