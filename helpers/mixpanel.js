export const mpDappView = function (sourceComponent, sourceModel, sourcePath, targetDapp) {
  const action = {}
  action.name = 'DApp - View'
  data = {}
  if (sourceComponent) { data.sourceComponent = sourceComponent }
  if (sourceModel) { data.sourceModel = sourceModel }
  if (sourcePath) { data.sourcePath = sourcePath }
  if (targetDapp) { data.targetDapp = targetDapp }
  action.data = data
  return action
}
