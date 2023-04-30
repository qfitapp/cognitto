provider "aws" {
  region = "us-east-1"
}

module "cognito" {
  source = "terraform-aws-modules/cognito/aws"

  user_pool_name = "my-user-pool"
  app_client_name = "my-app-client"
  identity_pool_name = "my-identity-pool"

  app_client_settings = {
    generate_secret = true
    callback_urls = ["http://localhost:3000/callback"]
    logout_urls = ["http://localhost:3000"]
    allowed_oauth_flows_user_pool_client = true
    allowed_oauth_scopes = ["openid"]
  }
}

output "app_client_id" {
  value = module.cognito.app_client_id
}

output "identity_pool_id" {
  value = module.cognito.identity_pool_id
}
