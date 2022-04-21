load('ext://restart_process', 'docker_build_with_restart')

settings = read_json('tilt_options.json', default={})

if settings.get("namespace"):
  namespace =  settings.get("namespace")

# Lines 11 & 12 are to be commented out if you are using another Tiltfile that loads this Tiltfile. 
# "default_registry" is to be set only once per tilt instance run by `tilt up`
 
if settings.get("default_registry"):
  default_registry(settings.get("default_registry").format(namespace), host_from_cluster='image-registry.openshift-image-registry.svc:5000/{}'.format(namespace))

if settings.get("allow_k8s_contexts"):
  allow_k8s_contexts(settings.get("allow_k8s_contexts"))

docker_build(
  'review-web', 
  '.',
  live_update=[
    #sync('.', '/'),
    run('npm run build', trigger=['./src']),
  ])

yaml = helm('./deploy/', namespace=namespace, values=['./tilt/values-local.yaml'])

k8s_yaml(yaml)

k8s_resource('review-web', port_forwards=['9000:4200'])
