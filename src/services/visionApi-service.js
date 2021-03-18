import vision from '@google-cloud/vision'

export default async function loadApiVisionLabels(path) {
  // Creates a client
  var client = new vision.ImageAnnotatorClient({
    credentials: {
      type: process.env.g_type,
      project_id: process.env.g_project_id,
      private_key_id: process.env.g_private_key_id,
      private_key: process.env.g_private_key,
      client_email: process.env.g_client_email,
      client_id: process.env.g_client_id,
      auth_uri: process.env.g_auth_uri,
      token_uri: process.env.g_token_uri,
      auth_provider_x509_cert_url: process.env.g_auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.g_client_x509_cert_url,
    },
  })

  // Performs label detection on the image file
  const [result] = await client.labelDetection(path)
  const labels = result.labelAnnotations

  return labels
}
