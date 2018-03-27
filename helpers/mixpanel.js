export const mpDappView = function (sourceComponent, sourceModel, sourcePath, targetDapp) {
  const data = {}

  if (sourceComponent) { data.sourceComponent = sourceComponent }
  if (sourceModel) { data.sourceModel = sourceModel }
  if (sourcePath) { data.sourcePath = sourcePath }
  if (targetDapp) { data.targetDapp = targetDapp }

  const action = {
    name: 'DApp - View',
    data: data
  }

  return action
}
