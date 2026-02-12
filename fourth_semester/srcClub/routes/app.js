import express from 'express'

import UnionRoutes from './Union.routes.js'
import Aso_MisRoutes from './Aso_Mis.routes.js'
import distritoRoutes from './distrito.routes.js'
import ClubRoutes from './club.routes.js'
import consejeroRoutes from './consejero.routes.js'
import especialidadesRoutes from './especialidades.routes.js'
import Pase_listRoutes from './Pase_list.routes.js'
import ActividadesRoutes from './Actividades.routes.js'
import unidadRoutes from './unidad.routes.js'

const app = express();

app.use(express.json());

app.use("/api", UnionRoutes);
app.use("/api", Aso_MisRoutes);
app.use("/api", distritoRoutes);
app.use("/api", ClubRoutes);
app.use("/api", consejeroRoutes);
app.use("/api", especialidadesRoutes);
app.use("/api", Pase_listRoutes);
app.use("/api", ActividadesRoutes);
app.use("/api", unidadRoutes);

export default app;