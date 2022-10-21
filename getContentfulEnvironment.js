const contentfulManagement = require("contentful-management")

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-mf3NpuNL1xkAEJ0Xx2dvpoeNDbsQuIG2GEKRjPasCS4',
  })

  return contentfulClient
    .getSpace('ulfuvkvbjoox')
    .then(space => space.getEnvironment('master'))
}